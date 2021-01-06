package com.devsuperior.dsdeliver.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.dto.ProductDTO;
import com.devsuperior.dsdeliver.entities.Order;
import com.devsuperior.dsdeliver.entities.OrderStatus;
import com.devsuperior.dsdeliver.entities.Product;
import com.devsuperior.dsdeliver.repositories.OrderRepository;
import com.devsuperior.dsdeliver.repositories.ProductRepository;
 
@Service //Register class to be injected in other components
public class OrderService {
	
	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productRepository;

	//product list converted to obj
		//this notation prevent DB lock, being read only
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll(){

		List<Order> list = repository.findOrdersWithProducts();
		
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}

	//order instance and insertion into DB 
	@Transactional
	public OrderDTO insert(OrderDTO dto){
		//Order instance of received data 		
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLatitude(),
				Instant.now(), OrderStatus.PENDING);
		
		for(ProductDTO p : dto.getProducts()) {

			//create the entity by id then add to order's prod list
			Product product = productRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		
		order = repository.save(order);
		return new OrderDTO(order);
	}
}
