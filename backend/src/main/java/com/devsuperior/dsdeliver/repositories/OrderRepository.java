package com.devsuperior.dsdeliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsdeliver.entities.Order;

//CRUD JPA implementation
public interface OrderRepository extends JpaRepository<Order, Long>{
	
	//Query specific for JPA usage - return the orders by moments
	@Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.products "
			+ "WHERE obj.status = 0 ORDER BY obj.moment ASC")
	
	List<Order> findOrdersWithProducts();
}
