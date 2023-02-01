-- limit part set/post
--insert-data

INSERT INTO public.mother_limit_history(
id, mother_limit_id, default_credit_limit, default_financing_percentage, default_credit_period, default_grace_period, default_interest_rate, default_penalty_rate, default_service_charge, default_safety_deposit_rate, default_disbursement_date, is_active, start_date, end_date, created_on, created_by)
VALUES (2, 1, 10, 1, 1, 1, 1, 1, 1, 1, '2013-03-24 00:00:00', 'false', '2013-03-24 00:00:00', '2013-03-24 00:00:00', '2013-03-24 00:00:00', 'system');














-- limit part get
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

--default-limit-information

select * from global_param gp ;

select 
	gp.default_credit_limit as total_credit_limit,
	gp.end_date as expiry_date,
	gp.default_interest_rate as interest_rate,
	gp.default_penalty_rate as penalty_rate,
	gp.default_service_charge as invoice_processing_cost,
	gp.default_safety_deposit_rate as deposit_rate,
	gp.default_financing_percentage as financing_rate

from global_param gp 








































