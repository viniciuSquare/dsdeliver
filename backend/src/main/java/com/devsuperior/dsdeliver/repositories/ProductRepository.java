package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliver.entities.Product;

//CRUD JPA to manipulate entity
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	//Spring data JPA query default mehtod, ordering by name	
	List<Product> findAllByOrderByNameAsc();

}
