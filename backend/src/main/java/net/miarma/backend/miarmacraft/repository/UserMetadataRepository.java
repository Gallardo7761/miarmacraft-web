package net.miarma.backend.miarmacraft.repository;

import net.miarma.backend.miarmacraft.model.UserMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMetadataRepository extends JpaRepository<UserMetadata, byte[]> {}