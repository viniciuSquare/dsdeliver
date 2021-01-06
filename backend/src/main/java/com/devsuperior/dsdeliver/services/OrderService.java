package com.devsuperior.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.entities.Order;
import com.devsuperior.dsdeliver.repositories.OrderRepository;
 
@Service //Register class to be injected in other components
public class OrderService {
	
	@Autowired
	private OrderRepository repository;

	//product list converted to obj
		//this notation prevent DB lock, being read only
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll(){

		List<Order> list = repository.findOrdersWithProducts();
		
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
}
