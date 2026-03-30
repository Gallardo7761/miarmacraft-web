package net.miarma.backend.miarmacraft.listener;

import com.eduardomcb.discord.webhook.WebhookClient;
import com.eduardomcb.discord.webhook.WebhookManager;
import com.eduardomcb.discord.webhook.models.Message;
import net.miarma.backend.miarmacraft.event.ModActionEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class DiscordListener {

    @Value("${discord.url}")
    private String WEBHOOK_URL;

    @Async
    @EventListener
    public void handleModAction(ModActionEvent event) {
        Message message = Objects.equals(event.action(), "added") ?
                new Message().setContent("Se ha añadido el mod **" + event.name() + "** a la lista @everyone") :
                new Message().setContent("Se ha eliminado el mod **" + event.name() + "** de la lista @everyone");
        sendWebhookMessage(message);
    }

    private void sendWebhookMessage(Message message) {
        WebhookManager webhookManager = new WebhookManager()
                .setChannelUrl(WEBHOOK_URL)
                .setMessage(message);
        webhookManager.exec();
    }
}
