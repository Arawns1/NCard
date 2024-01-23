package br.com.itneki.nekicard.card.domain;

import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import br.com.itneki.nekicard.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity(name = "tb_card")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "CARD_CD_ID")
    private UUID id;

    @Column(name = "CARD_BOOL_STATUS")
    @Builder.Default
    private boolean status = true;

    @Column(name = "CARD_CD_NFC_ID", unique = true)
    @NotBlank(message = "O campo (nfc_id) não pode ser nulo ou vazio")
    private String nfcId;

    @Column(name = "CARD_TX_TYPE")
    @Enumerated(EnumType.STRING)
    private CardType type;

    @Column(name = "CARD_TX_QRCODE_URL")
    @NotBlank(message = "O campo (qrCode) não pode ser nulo ou vazio")
    private String qrCodeURL;

    @ManyToOne
    @JoinColumn(name = "USER_CD_ID", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Column(name = "USER_CD_ID")
    private UUID userId;

    public void excluir(){
        this.status = false;
    }
}
