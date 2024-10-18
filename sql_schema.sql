
create table movies(id int primary key auto_increment, title varchar(30), director varchar(30), genre varchar(30), release_year varchar(30), duration_minutes time , rating int, poster_image varchar(100), box_office_total int 
);

INSERT INTO movies (title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total)
VALUES
('Inception', 'Christopher Nolan', 'Sci-Fi', 2010, '02:28:00', 8.8, 'https://www.aceshowbiz.com/images/still/inception_poster19.jpg', 829895144),
('Parasite', 'Bong Joon Ho', 'Thriller', 2019, '02:12:00', 8.6, 'https://wallpapercave.com/wp/wp5264425.jpg', 258908815),
('Interstellar', 'Christopher Nolan', 'Sci-Fi', 2014, '02:49:00', 8.6, 'https://www.themoviedb.org/t/p/original/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg', 701729206),
('The Grand Budapest Hotel', 'Wes Anderson', 'Comedy', 2014, '01:39:00', 8.1, 'https://www.themoviedb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', 173082122),
('Whiplash', 'Damien Chazelle', 'Drama', 2014, '01:46:00', 8.5, 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/60068824896899.5633be5560c3a.jpg', 48882041),
('Mad Max: Fury Road', 'George Miller', 'Action', 2015, '02:00:00', 8.1, 'https://www.themoviedb.org/t/p/original/vl5661icxjzGLNjYE1sJz2Iiz47.jpg', 374736354),
('La La Land', 'Damien Chazelle', 'Romance', 2016, '02:08:00', 8.0, 'https://cdn.traileraddict.com/content/summit-entertainment/la-la-land-poster-8.jpg', 448907972),
('Her', 'Spike Jonze', 'Romance', 2013, '02:06:00', 8.0, 'http://nsm08.casimages.com/img/2014/03/23/14032301512817207912089088.jpg', 48756466),
('The Social Network', 'David Fincher', 'Biography', 2010, '02:00:00', 7.8, 'https://media.senscritique.com/media/000006571333/source_big/The_Social_Network.jpg', 224920315),
('Get Out', 'Jordan Peele', 'Horror', 2017, '01:44:00', 7.7, 'https://www.themoviedb.org/t/p/original/mjTgZtmxUaLC60TBw7Jc0kA2AVx.jpg', 255407969);

