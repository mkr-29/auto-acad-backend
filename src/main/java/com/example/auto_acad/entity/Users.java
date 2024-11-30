package com.example.auto_acad.entity;

import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@Data
@NoArgsConstructor
public class Users {
    private String userName;


    @Id
    private Integer userID;
    @Indexed(unique = true)

    @NonNull
    private String password;
}
