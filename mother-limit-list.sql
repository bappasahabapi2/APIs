-- limit part
select * from mother_limit;
select * from mother_limit_history;
select * from relationship_manager;
select * from company;



select 
 	mlh.default_credit_limit as credit_limit,
	mlh.default_disbursement_date as disbursement_date,
	
	al.status,
	al.end_date as expiry_date,
	
	rm.name as rm_name,
	
	c.name as supplier_name,
	c.id as supplier_id
	
from mother_limit_history mlh
left join mother_limit ml on ml.id =mlh.id
left join achor_limit al on al.mother_limit_id=ml.id
left join relationship_manager rm on rm.id =ml.id
left join company c on c.id =ml.id


--branch-list.js
select * from fi_branch;

select 
	fb.id,
	fb.name,
	fb.code,
	fb.address
	
from fi_branch fb ;


--rm-list.js
select * from relationship_manager;

select 
	rm.id,
	rm.name,
	rm.code
from relationship_manager rm ;

--supplier-id-list

select * from company;
select * from address;


select 
	c.name,
	c.code as supplier_id,
	
	a.address_details


from company c 
left join address a on a.company_id  =c.id;










































