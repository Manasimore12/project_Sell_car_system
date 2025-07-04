package com.code.SellCar_Spring.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code.SellCar_Spring.entities.User;
import com.code.SellCar_Spring.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findFirstByEmail(String email);
	Optional<User> findByUserRole(UserRole userRole);
}
