package net.miarma.backend.miarmacraft.model;

import jakarta.persistence.*;
import net.miarma.backlib.util.UuidUtil;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "minecraft_mods")
public class Mod {

    @Id
    @Column(name = "mod_id", columnDefinition = "BINARY(16)")
    private byte[] modIdBin;

    @Transient
    private UUID modId;

    private String name;
    private String url;
    private Byte status;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    private void prePersist() {
        if (modId != null) modIdBin = UuidUtil.uuidToBin(modId);
    }

    @PostLoad
    private void postLoad() {
        if (modIdBin != null) modId = UuidUtil.binToUUID(modIdBin);
    }

    public UUID getModId() {
        return modId;
    }

    public void setModId(UUID modId) {
        this.modId = modId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
