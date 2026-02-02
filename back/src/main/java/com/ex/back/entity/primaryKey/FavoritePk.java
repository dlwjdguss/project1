package com.ex.back.entity.primaryKey;

import java.beans.ConstructorProperties;
import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class FavoritePk implements Serializable{
    @Column(name = "user_email", nullable = false, length = 255)
    private String userEmail;

    @Column(name = "board_number", nullable = false)
    private Integer boardNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FavoritePk that = (FavoritePk) o;
        return Objects.equals(userEmail, that.userEmail)
                && Objects.equals(boardNumber, that.boardNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, boardNumber);
    }
}


