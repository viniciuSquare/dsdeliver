package com.devsuperior.dsdeliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliver.dto.ProductDTO;
import com.devsuperior.dsdeliver.entities.Product;
import com.devsuperior.dsdeliver.repositories.ProductRepository;
 
@Service //Register class to be injected in other components
public class ProductService {
	
	@Autowired
	private ProductRepository repository;

	//product list converted to obj
		//this notation prevent DB lock, being read only
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll(){

		List<Product> list = repository.findAllByOrderByNameAsc();
		
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
}
