package br.com.itneki.nekicard.user_photo.domain;

import br.com.itneki.nekicard.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.util.UUID;

@Entity(name = "tb_user_photo")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "USPH_CD_ID")
    private UUID id;

    @Lob
    @JdbcTypeCode(Types.BINARY)
    @Column(name = "USPH_BL_PHOTO")
    @Size(max = 10485760, message = "O tamanho da imagem não pode exceder 10 MB")
    private byte[] photo;

    @Column(name = "USPH_TX_TYPE")
    private String type;

    @Column(name = "USPH_TX_SIZE")
    private Long size;

    @OneToOne
    @JoinColumn(name = "USER_CD_ID", nullable = true, insertable = false, updatable = false)
    private User user;

    @Column(name = "USER_CD_ID")
    private UUID userId;

    public UserPhoto(byte[] bytes, String contentType, long size, UUID id) {
        this.photo = bytes;
        this.size = size;
        this.type = contentType;
        this.userId = id;
    }
}
