package net.miarma.backend.miarmacraft.dto;

import net.miarma.backlib.dto.CredentialDto;
import net.miarma.backlib.dto.UserDto;

public record PlayerDto(UserDto user, CredentialDto account, UserMetadataDto.Response metadata) {}
