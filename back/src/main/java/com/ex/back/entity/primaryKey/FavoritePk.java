package com.ex.back.entity.primaryKey;

import java.beans.ConstructorProperties;
import java.io.Serializable;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FavoritePk implements Serializable{
    @Column(name="user_mail")
    private String userEmail;

     @Column(name="board_number")
    private String boardNumber;
}

