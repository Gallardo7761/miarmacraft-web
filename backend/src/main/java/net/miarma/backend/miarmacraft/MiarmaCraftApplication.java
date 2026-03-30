package net.miarma.backend.miarmacraft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication(scanBasePackages = {
        "net.miarma.backend.miarmacraft",
        "net.miarma.backlib"
})
public class MiarmaCraftApplication {
    public static void main(String[] args) {
        SpringApplication.run(MiarmaCraftApplication.class, args);
    }
}
