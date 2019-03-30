-- DROP

-- CREATE TABLE
CREATE TABLE Users
(
    user_id SERIAL PRIMARY KEY,
    name varchar(100),
    username varchar(30) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(250) NOT NULL,
    group_id int REFERENCES Groups(group_id)
);
CREATE TABLE Groups
(
    group_id SERIAL PRIMARY KEY,
    group_name varchar(15),
    group_key varchar(250)
);
CREATE TABLE Recipe
(
    recipe_id   SERIAL          PRIMARY KEY,
    recipe_name varchar(100)    NOT NULL,
    recipe_url  varchar(200),
    recipe_img  varchar(200),
    serving     int             NOT NULL,
    time        int             NOT NULL
);
CREATE TABLE Ingredient
(
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name varchar(100) NOT NULL,
    icon varchar(100)
);
CREATE TABLE Ingredient_Rec
(
    ingredient_rec_id   SERIAL      PRIMARY KEY,
    recipe_id           int         REFERENCES Recipe(recipe_id),
    ingredient_id       int         REFERENCES Ingredient(ingredient_id),
    quantity            int         NOT NULL,
    unit                varchar(30) NOT NULL
);
CREATE TABLE ShoppingList
(
    list_id         SERIAL          PRIMARY KEY,
    list_name       varchar(100)    NOT NULL,
    group_id        int             NOT NULL
);
CREATE TABLE Ingredient_Shop
(
    ingredient_shop_id   SERIAL      PRIMARY KEY,
    list_id              int         REFERENCES ShoppingList(list_id),
    ingredient_id        int         REFERENCES Ingredient(ingredient_id),
    quantity             int         NOT NULL
);
CREATE TABLE Plan
(
    plan_id         SERIAL          PRIMARY KEY,
    date            date            NOT NULL
);
CREATE TABLE Plan_Rec
(
    plan_rec_id     SERIAL      PRIMARY KEY,
    plan_id         int         REFERENCES Plan(plan_id),
    recipe_id       int         REFERENCES Recipe(recipe_id)
);
INSERT INTO Users
VALUES
    ( DEFAULT, 
    'Abby Loosle',
    'aloo',
    'a@g.com'
    'pass',
    1
),
    ( DEFAULT, 
    'Nick Loosle',
    'nloo',
    'n@g.com'
    'pass',
    1
);
INSERT INTO Groups
VALUES
    ( DEFAULT, 
    'loosles',
    'food'
),
    ( DEFAULT, 
    'kings',
    'food'
);
INSERT INTO Recipe
VALUES
    ( DEFAULT, 
    'Instant Pot Salsa Chicken',
    'https://www.simplyhappyfoodie.com/instant-pot-salsa-chicken/',
    'https://www.simplyhappyfoodie.com/wp-content/uploads/2017/12/instant-pot-salsa-chicken-2.jpg',
    6
);
INSERT INTO Ingredient
(ingredient_name)
VALUES
    ('Chicken Breast'),
    ('Salsa'),
    ('Cumin');
INSERT INTO Ingredient_Rec
VALUES
    ( DEFAULT, 1, 1, 3, 'whole breast'),
    ( DEFAULT, 1, 2, 1, 'jar'),
    ( DEFAULT, 1, 3, 2, 'tsp');
INSERT INTO ShoppingList
VALUES
(
    DEFAULT,
    'Loosle Shopping',
    1
);
INSERT INTO Ingredient_Shop
VALUES
(
    DEFAULT,
    1,
    1,
    2
),
(
    DEFAULT,
    1,
    2,
    4
);
INSERT INTO Plan
VALUES
(
    DEFAULT,
    '2019-03-14'
);
INSERT INTO Plan_Rec
VALUES
(
    DEFAULT,
    1,
    1
);