package com.ivenxu.clientproxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class ClientProxyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientProxyApplication.class, args);
	}
}
