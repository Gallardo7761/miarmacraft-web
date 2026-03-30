package net.miarma.backend.miarmacraft.controller;

import net.miarma.backend.miarmacraft.dto.ModDto;
import net.miarma.backend.miarmacraft.event.ModActionEvent;
import net.miarma.backend.miarmacraft.mapper.ModMapper;
import net.miarma.backend.miarmacraft.model.Mod;
import net.miarma.backend.miarmacraft.service.ModService;
import net.miarma.backlib.io.FileService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mods")
public class ModController {

    private final ModService modService;
    private final ApplicationEventPublisher eventPublisher;
    private final FileService fileService;

    public ModController(ModService modService, ApplicationEventPublisher eventPublisher, FileService fileService) {
        this.modService = modService;
        this.eventPublisher = eventPublisher;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<ModDto.Response>> getAll() {
        List<ModDto.Response> response = modService.getAll().stream()
                .map(ModMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{modId}")
    public ResponseEntity<ModDto.Response> getById(@PathVariable("modId") UUID modId) {
        return ResponseEntity.ok(
            ModMapper.toResponse(modService.getById(modId))
        );
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<ModDto.Response> create(@RequestBody ModDto.Request request) {
        Mod savedMod = modService.save(ModMapper.toEntity(request));
        eventPublisher.publishEvent(new ModActionEvent(savedMod.getName(), "added"));
        return ResponseEntity.ok(ModMapper.toResponse(savedMod));
    }

    @DeleteMapping("/{modId}")
    @PreAuthorize("hasAnyRole('MINECRAFT_ROLE_ADMIN', 'MINECRAFT_ROLE_DEV')")
    public ResponseEntity<ModDto.Response> delete(@PathVariable("modId") UUID modId) {
        Mod deletedMod = modService.delete(modId);
        eventPublisher.publishEvent(new ModActionEvent(deletedMod.getName(), "deleted"));
        return ResponseEntity.ok(ModMapper.toResponse(deletedMod));
    }
}
