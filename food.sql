-- DROP

-- CREATE TABLE
CREATE TABLE User
(
    user_id SERIAL PRIMARY KEY,
    name varchar(100),
    username varchar(30) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(250) NOT NULL,
    group_id varchar(50) NOT NULL,
);
CREATE TABLE Group
(
    group_id SERIAL PRIMARY KEY,
    group_name varchar(15) NOT NULL,
    group_key varchar(50) NOT NULL
);
CREATE TABLE Recipe
(
    recipe_id   SERIAL          PRIMARY KEY,
    recipe_name varchar(100)    NOT NULL,
    recipe_url  varchar(200),
    recipe_img  varchar(200),
    serving     int             NOT NULL
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
    date            datetime        NOT NULL
);
CREATE TABLE Plan_Rec
(
    plan_rec_id     SERIAL      PRIMARY KEY,
    plan_id         int         REFERENCES Plan(plan_id),
    recipe_id       int         REFERENCES Recipe(recipe_id)
);
INSERT INTO User
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
INSERT INTO Group
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
INSERT INTO Movies
VALUES
    ( DEFAULT, 'Get Smart', 2008, 'Maxwell Smart, a highly intellectual but bumbling spy working for the CONTROL agency, is tasked with preventing a terrorist attack from rival spy agency KAOS.', TRUE, TRUE, 110, 3, 3, 1, 1, 2
),
    ( DEFAULT, 'Mama Mia!', 2008, 'The story of a bride-to-be trying to find her real father told using hit songs by the popular 1970s group ABBA.', TRUE, TRUE, 109, 3, 7, 1, 1, 2
),
    ( DEFAULT, 'The Dark Knight', 2008, 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.', TRUE, TRUE, 152, 3, 2, 1, 1, 2
),
    ( DEFAULT, 'Yes Man', 2008, 'A man challenges himself to say "yes" to everything for an entire year.', TRUE, TRUE, 104, 3, 3, 1, 1, 2
);