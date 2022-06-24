INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('Tech');

INSERT INTO role (title,salary,department_id)
VALUES
('CEO',100000,1),
('Sales Manager',90000,1),
('Salesperson',75000,2),
('CIO',95000,1),
('Developer',85000,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
('Aaron','Jones',1,1),
('Janet','Jones',2,1),
('Robert','Redbones',4,1),
('Frank','Horse',3,2),
('Donna','Feline',3,2),
('Charles','Canine',5,3),
('Doug','Fishboy',5,3);


