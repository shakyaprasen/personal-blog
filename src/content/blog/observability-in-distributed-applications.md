---
title: Observability in distributed systems
description: A starting guide to understand observability in distributed systems.
tags:
  - begineer
  - distributed-systems
  - logs
  - metrics
  - traces
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-05-27T07:28:05.301Z"
image: https://i.imgur.com/CdhsoTt.png
category: full-stack
---


## Background

A basic way to debug anything or know what is happening in your application is Logs. Logs show a record of application events at a particular time. I used to extensively rely on logging to debug as well as observe the events in any applications I develop. 
Now as I am working in a complex and distributed application, logs don't just seem to be enough to know what is happening inside of my application. Logs from a particular application just don't have the information necessary to properly get a full sense of the events inside the application. Things like request origin, time-to-execution, and dependency among the applications are some information that cannot be properly conveyed by logs. This has changed my perspective on the importance of Observability in a distributed application.

Before proceeding further into Observability, we will need to define some basic things:

### Distributed systems

In simple words, a distributed system is a system where the components are located in logically or physically different computing resources which communicate through a network. As business requirements have become complex and a computer program is expected to do more and more, distributed systems have become popular as a way of addressing these requirements. If you are working to solve a complex problem for scale, more often than not you are working on a distributed system.

### Observability

Observability is the ability to gain an understanding of the internal state and behavior from only its external outputs.  It helps teams from identifying problems to finding the root cause without any additional coding or testing.
It allows us to explore and monitor system components, interactions, and dependencies even in a highly distributed and dynamic environment. A sufficiently complex system requires a holistic approach such as observability to know what is happening. We can effectively troubleshoot issues, detect anomalies, optimize performance, and make informed decisions by embracing observability.

## Components in an observable system

There are three primary components in an observable system commonly known as the "Three Pillars of Observability":

- Logs  
	Logs are as mentioned at the start of this post, a record of events that have transpired inside of an application. They provide a glimpse into the system at a particular time. It is primarily used for debugging purposes.
	
- Metrics  
	Metrics are quantitative measurements that provide insight into the performance, and health of a system over time. Unlike logs, metrics provide aggregated data which offers a high-level view of a system's performance. Some common metrics are CPU capacity, memory usage, request/response latency, etc.
	
- Traces  
	Traces are the recorded life-cycle of a request or a transaction as it moves through the various components in a distributed system. We can also term it as an 'end-to-end' journey for a request or a transaction. Traces capture the interactions and timings between the different services when they perform their specific task for a request. This can help visualize the relation/dependencies between different parts of a distributed system.

## Benefits of Observability

So after talking about what observability is, I would like to point out some use and advantages of observability:

- Find the dependencies and relations between different parts of a system.
- Map out the path for different events/requests.
- Find issues that you don't know exist.
- Catch issues and resolve them without the complexity of a distributed system
- Enable self-healing infrastructure

## Tools and technologies for Observability

Some tools that I have used and are suitable for different pillars of observability are:

- Log aggregation and management:
	- EFK/ELK - Elasticsearch, FluentBit/FluentD or Logstash and Kibana
	- Native Logging for Cloud Service Providers - AWS Cloudwatch, GCP logging, etc.
	
-  Metrics:
	- Prometheus
	- Grafana
	- InfluxDB

- Traces:
	- Jaeger
	- Zipkin
	- Opentelemetry

*Note: There are third-party observability platforms that provide support for all three pillars of observability. Using these platforms might be sensible if you do not want to manage them individually. Some of these platforms in no particular order are: Datadog, Logz.io, Honeycomb, etc.*

## Further Reading:

[IBM writeup on observability](https://www.ibm.com/topics/Observability)  
[New Relic - What is Observability?](https://newrelic.com/blog/best-practices/what-is-observability)
