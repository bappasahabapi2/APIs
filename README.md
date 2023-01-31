# APIs

-- limit part
select * from invoice;
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
join mother_limit ml on ml.id =mlh.id
join achor_limit al on al.mother_limit_id=ml.id
join relationship_manager rm on rm.id =ml.id
join company c on c.id =ml.id
