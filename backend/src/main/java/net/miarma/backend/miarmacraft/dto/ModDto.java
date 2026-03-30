package net.miarma.backend.miarmacraft.dto;

import java.time.Instant;
import java.util.UUID;

public class ModDto {
    public static class Request {
        private UUID modId;
        private String name;
        private String url;
        private Byte status;

        public UUID getModId() { return modId; }
        public void setModId(UUID modId) { this.modId = modId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public Byte getStatus() { return status; }
        public void setStatus(Byte status) { this.status = status; }
    }

    public static class Response {
        private UUID modId;
        private String name;
        private String url;
        private Byte status;
        private Instant createdAt;
        private Instant updatedAt;

        public UUID getModId() { return modId; }
        public void setModId(UUID modId) { this.modId = modId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public Byte getStatus() { return status; }
        public void setStatus(Byte status) { this.status = status; }
        public Instant getCreatedAt() { return createdAt; }
        public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
        public Instant getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    }
}
