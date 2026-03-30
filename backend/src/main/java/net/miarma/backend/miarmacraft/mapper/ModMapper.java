package net.miarma.backend.miarmacraft.mapper;

import net.miarma.backend.miarmacraft.dto.ModDto;
import net.miarma.backend.miarmacraft.model.Mod;

public class ModMapper {

    public static ModDto.Response toResponse(Mod entity) {
        if (entity == null) return null;

        ModDto.Response dto = new ModDto.Response();
        dto.setModId(entity.getModId());
        dto.setName(entity.getName());
        dto.setUrl(entity.getUrl());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    public static Mod toEntity(ModDto.Request dto) {
        if (dto == null) return null;

        Mod entity = new Mod();
        entity.setModId(dto.getModId());
        entity.setName(dto.getName());
        entity.setUrl(dto.getUrl());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    public static Mod fromResponse(ModDto.Response dto) {
        if (dto == null) return null;

        Mod entity = new Mod();
        entity.setModId(dto.getModId());
        entity.setName(dto.getName());
        entity.setUrl(dto.getUrl());
        entity.setStatus(dto.getStatus());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }
}
