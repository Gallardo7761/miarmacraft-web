package net.miarma.backend.miarmacraft.dto;

import net.miarma.backlib.dto.CredentialDto;
import net.miarma.backlib.dto.UserDto;

public record MinecraftLoginResponse(String token, UserDto user, CredentialDto account, UserMetadataDto.Response metadata) {
}
