package net.miarma.backend.miarmacraft.service;

import net.miarma.backend.miarmacraft.model.Mod;
import net.miarma.backend.miarmacraft.repository.ModRepository;
import net.miarma.backlib.exception.NotFoundException;
import net.miarma.backlib.util.UuidUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ModService {

    private final ModRepository modRepository;

    public ModService(ModRepository modRepository) {
        this.modRepository = modRepository;
    }

    public List<Mod> getAll() {
        return modRepository.findAll();
    }

    public Mod getById(UUID id) {
        byte[] idBytes = UuidUtil.uuidToBin(id);
        return modRepository.findById(idBytes)
                .orElseThrow(() -> new NotFoundException("Mod no encontrado"));
    }

    @Transactional
    public Mod save(Mod mod) {
        return modRepository.save(mod);
    }

    public Mod delete(UUID id) {
        try {
            Mod mod = getById(id);
            modRepository.delete(mod);
            return mod;
        } catch (Exception e) {
            throw new RuntimeException("No se pudo eliminar el mod");
        }
    }
}