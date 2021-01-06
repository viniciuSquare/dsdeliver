package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliver.entities.Product;

//JPA CRUD to manipulate entity
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	//Spring data JPA query default method, ordering by name	
	List<Product> findAllByOrderByNameAsc();

}
