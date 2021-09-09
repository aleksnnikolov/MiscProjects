<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page import="com.luv2code.springdemo.util.SortUtils" %>

<!DOCTYPE html>

<html>
	<head>
		<title>CRM</title>
		
		<link type="text/css" 
			  rel="stylesheet" 
			  href="${pageContext.request.contextPath}/resources/css/style.css" />
			  
	</head>

	<body>
	
		<div id="wrapper">
			<div id="header">
				<h2>CRM - Customer Relationship Manager</h2>
			</div>
		</div>
		
		
		<div id="container">
			<div id="content">
				
				<input type="button" value="Add Customer" 
					   onclick="window.location.href='add'; return false;"
					   class="add-button"
				/>
				
				
				<form:form action="search" method="GET">
	                Search customer: <input type="text" name="searchName" />
	                
	                <input type="submit" value="Search" class="add-button" />
            	</form:form>
				
				
				<c:url var="sortLinkFirstName" value="/customer/list">
					<c:param name="sort" value="<%= Integer.toString(SortUtils.FIRST_NAME) %>" />
				</c:url>
				
				<c:url var="sortLinkLastName" value="/customer/list">
					<c:param name="sort" value="<%= Integer.toString(SortUtils.LAST_NAME) %>" />
				</c:url>
				
				<c:url var="sortLinkEmail" value="/customer/list">
					<c:param name="sort" value="<%= Integer.toString(SortUtils.EMAIL) %>" />
				</c:url>									
				
				
				<table>
					<tr>
						<th><a href="${sortLinkFirstName}">First Name</a></th>
						<th><a href="${sortLinkLastName}">Last Name</a></th>
						<th><a href="${sortLinkEmail}">Email</a></th>
						<th>Action</th>
					</tr>
					
					<c:forEach var="tempCustomer" items="${customers}">
						
						<c:url var="updateLink" value="/customer/showUpdateForm">
							<c:param name="customerId" value="${tempCustomer.id}" />
						</c:url>
					
						<c:url var="deleteLink" value="/customer/delete">
							<c:param name="customerId" value="${tempCustomer.id}" />
						</c:url>
					
						<tr>
							<td> ${tempCustomer.firstName} </td>
							<td> ${tempCustomer.lastName} </td>
							<td> ${tempCustomer.email} </td>
							
							<td> 
								<a href="${updateLink}">Update</a>
								|
								<a href="${deleteLink}"
								   onclick="if (!(confirm('Are you sure you want to delete this customer?'))) return false">Delete</a>
							</td>
							
						</tr>
					</c:forEach>
					
				</table>
				
			</div>
		</div>
		
	</body>

</html>