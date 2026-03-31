package net.miarma.backend.miarmacraft.controller;

import net.miarma.backend.miarmacraft.dto.PlayerDto;
import net.miarma.backend.miarmacraft.dto.StatusDto;
import net.miarma.backend.miarmacraft.security.MinecraftPrincipal;
import net.miarma.backend.miarmacraft.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<List<PlayerDto>> getAll() {
        return ResponseEntity.ok(playerService.getAll());
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<PlayerDto> getById(@PathVariable("userId") UUID userId) {
        PlayerDto viewer = playerService.getById(userId);
        return ResponseEntity.ok(viewer);
    }

    @GetMapping("/me")
    public ResponseEntity<PlayerDto> getMe(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof MinecraftPrincipal principal)) {
            throw new IllegalStateException("Tipo de autenticación inválida");
        }

        return ResponseEntity.ok(
            playerService.getById(principal.getUserId())
        );
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<PlayerDto> update(
            @PathVariable("userId") UUID userId,
            @RequestBody PlayerDto changes
    ) {
        PlayerDto updated = playerService.update(userId, changes);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{userId}/status")
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<StatusDto> updateStatus(
            @PathVariable("userId") UUID userId,
            @RequestBody StatusDto status
    ) {
        StatusDto updated = playerService.updateStatus(userId, status);
        return ResponseEntity.ok(updated);
    }
}
