package net.miarma.backend.miarmacraft.service;

import net.miarma.backend.miarmacraft.client.MinecraftWebClient;
import net.miarma.backend.miarmacraft.dto.*;
import net.miarma.backend.miarmacraft.mapper.UserMetadataMapper;
import net.miarma.backend.miarmacraft.model.UserMetadata;
import net.miarma.backlib.dto.UserWithCredentialDto;
import net.miarma.backlib.exception.NotFoundException;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class PlayerService {
    private final MinecraftWebClient webClient;
    private final UserMetadataService userMetadataService;

    public PlayerService(MinecraftWebClient webClient, UserMetadataService userMetadataService) {
        this.webClient = webClient;
        this.userMetadataService = userMetadataService;
    }

    @Cacheable(value = "playerById")
    public PlayerDto getById(UUID userId) {
        var uwc = webClient.getUserWithCredential(userId, (byte)1);
        if (uwc == null) {
            throw new NotFoundException("Jugador no encontrado");
        }

        var meta = userMetadataService.getById(userId);
        if (meta == null) {
            throw new NotFoundException("Metadatos de usuario no encontrados");
        }

        return new PlayerDto(
            uwc.user(),
            uwc.account(),
            UserMetadataMapper.toResponse(meta)
        );
    }

    @Cacheable("players")
    public List<PlayerDto> getAll() {
        List<UserWithCredentialDto> all = webClient.getAllUsersWithCredentials((byte)1);

        return all.stream()
            .filter(uwc -> userMetadataService.existsById(uwc.user().getUserId()))
            .filter(uwc -> uwc.account().getStatus() != (byte)0)
            .map(uwc -> {
                var meta = userMetadataService.getById(uwc.user().getUserId());
                return new PlayerDto(
                    uwc.user(),
                    uwc.account(),
                    UserMetadataMapper.toResponse(meta)
                );
            })
            .toList();
    }

    @CacheEvict(value = "players", allEntries = true)
    public CreatedPlayerResponse create(CreatePlayerDto dto) {
        UserWithCredentialDto uwc = webClient.register(dto);

        UserMetadata metadata = new UserMetadata();
        metadata.setUserId(uwc.user().getUserId());
        metadata.setRole((byte)0);
        userMetadataService.create(metadata);

        return new CreatedPlayerResponse(
            new PlayerDto(
                uwc.user(),
                uwc.account(),
                UserMetadataMapper.toResponse(metadata)
            ),
            dto.password()
        );
    }

    @Caching(evict = {
        @CacheEvict(value = "playerById", key = "#p0"),
        @CacheEvict(value = "players", allEntries = true)
    })
    public PlayerDto update(UUID userId, PlayerDto changes) {
        try {
            webClient.updateUser(userId, new UserWithCredentialDto(changes.user(), changes.account()));
            userMetadataService.update(userId, UserMetadataMapper.fromResponse(changes.metadata()));
            return changes;
        } catch (Exception e) {
            throw new RuntimeException("No se pudo actualizar el jugador");
        }
    }

    @Caching(evict = {
        @CacheEvict(value = "playerById", key = "#p0"),
        @CacheEvict(value = "players", allEntries = true)
    })
    public StatusDto updateStatus(UUID userId, StatusDto dto) {
        try {
            webClient.updateCredentialStatus(userId, (byte)1, (byte)dto.status());

            if(dto.status() == (byte)0) {
                UserMetadata metadata = userMetadataService.getById(userId);
                metadata.setDeactivatedAt(Instant.now());
                userMetadataService.update(userId, metadata);
            }

            return dto;
        } catch (Exception e) {
            throw new RuntimeException("No se pudo actualizar el jugador");
        }
    }

    @CacheEvict(value = "playerById", key = "#p0")
    public String resetPassword(UUID userId) {
        return webClient.resetPassword(userId, (byte) 1);
    }
}
