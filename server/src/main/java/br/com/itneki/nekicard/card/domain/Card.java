package br.com.itneki.nekicard.card.domain;

import br.com.itneki.nekicard.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    private boolean status;

    @Column(name = "CARD_CD_NFC_ID")
    @NotBlank(message = "O campo (nfc_id) não pode ser nulo ou vazio")
    private UUID nfcId;

    @Column(name = "CARD_TX_TYPE")
    @Enumerated(EnumType.STRING)
    @NotBlank(message = "O campo (tipo) não pode ser nulo ou vazio")
    private CardType type;

    @Column(name = "CARD_TX_QRCODE_URL")
    @NotBlank(message = "O campo (qrCode) não pode ser nulo ou vazio")
    private String qrCodeURL;

    @ManyToOne
    @JoinColumn(name = "USER_CD_ID")
    private User user;

}
