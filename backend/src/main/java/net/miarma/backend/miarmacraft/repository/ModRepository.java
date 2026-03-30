package net.miarma.backend.miarmacraft.repository;

import net.miarma.backend.miarmacraft.model.Mod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModRepository extends JpaRepository<Mod, byte[]> {}
