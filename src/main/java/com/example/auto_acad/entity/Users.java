package com.example.auto_acad.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;

@Document(collection = "Users")
@Data
@NoArgsConstructor
public class Users {

    @NotNull(message = "User name cannot be null")
    private String userName;

    @Id
    private ObjectId userID;

    @Indexed(unique = true)
    @NotNull(message = "Password cannot be null")
    private String password;

}
