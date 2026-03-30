package net.miarma.backend.miarmacraft.controller;

import net.miarma.backend.miarmacraft.client.CoreAuthClient;
import net.miarma.backend.miarmacraft.dto.MinecraftLoginResponse;
import net.miarma.backend.miarmacraft.mapper.UserMetadataMapper;
import net.miarma.backend.miarmacraft.model.UserMetadata;
import net.miarma.backend.miarmacraft.service.UserMetadataService;
import net.miarma.backlib.dto.LoginRequest;
import net.miarma.backlib.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class MinecraftAuthController {
    private final UserMetadataService metadataService;
    private final CoreAuthClient authClient;

    public MinecraftAuthController(UserMetadataService metadataService,
                                   CoreAuthClient authClient) {
        this.metadataService = metadataService;
        this.authClient = authClient;
    }

    @PostMapping("/login")
    public ResponseEntity<MinecraftLoginResponse> login(@RequestBody LoginRequest req) {
        LoginResponse coreResponse = authClient.login(req);
        UserMetadata metadata = metadataService.getById(coreResponse.user().getUserId());
        return ResponseEntity.ok(
            new MinecraftLoginResponse(
                coreResponse.token(),
                coreResponse.user(),
                coreResponse.account(),
                UserMetadataMapper.toResponse(metadata)
            )
        );
    }
}
