-- Zadatak 2 - Podaci

--Kredit
INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (nextval('kredit_seq'), 'Stambeni kredit', 'SK', 'Od 10.000 EUR - do 80% od iznosa kupoprodajne vrednosti nepokretnosti, period otplate: od 13 do 180 meseci, kamatna stopa: ucesce 30%');
INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (nextval('kredit_seq'), 'Kes kredit', 'KK', 'Iznos kredita: 50.000 - 2.250.000 RSD, period otplate: 18 - 71 meseci, kamatna stopa: 12% fiksna');
INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (nextval('kredit_seq'), 'Kredit za kupovinu automobila', 'KZKA', 'Iznos kredita: Za kupovinu od pravnih lica 200.000 - 3.600.000 RSD Za kupovinu od fizickih lica 200.000 - 1.650.000 RSD, period otplate: 18 - 71 meseca, kamatna stopa: 8,49%, fiksna');
INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (nextval('kredit_seq'), 'Kes kredit za penzionere', 'KKZP', 'Senior Kes kredit mozete uzeti ako ste penzioner i imate izmedju 55 i 79 godina. Iznos kredita: 50.000 - 1.500.000 RSD, period otplate: 12 - 71 meseci, kamatna stopa: 14% godisnje, fiksna');
INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (nextval('kredit_seq'), 'Kredit za refinansiranje', 'KZR', 'Iznos kredita: 25.000 - 2.250.000 RSD, period otplate: 6 - 71 meseci, kamatna stopa: 12% fiksna');

INSERT INTO kredit(id, naziv, oznaka, opis)
VALUES (-100, 'TestNaziv', 'TestOznaka', 'TestOpis');
--Klijent

INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES(nextval('klijent_seq'), 'Petar', 'Petrovic', 148529682, 1);
INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES(nextval('klijent_seq'), 'Marija', 'Nikolic', 123629644, 2);
INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES(nextval('klijent_seq'), 'Milos', 'Milanovic', 243629231, 3);
INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES(nextval('klijent_seq'), 'Nikolina', 'Nikolic', 267835632, 4);
INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES(nextval('klijent_seq'), 'Marko', 'Markovic', 195482753, 5);

INSERT INTO klijent(id, ime, prezime, broj_lk, kredit)
VALUES (-100, 'TestIme', 'TestPrezime', 1241551, '1');

--Tip racuna
INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES(nextval('tip_racuna_seq'), 'Dinarski racun', 'DINR', 'Dinarski racun mozete koristiti za licne uplate kao i za izvrsavanje transakcija');
INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES(nextval('tip_racuna_seq'), 'Devizni racun', 'DEVR', 'Na devizni racun mozete uplatiti sledece vrste valuta: EUR, AUD, CAD, DKK, JPY, NOK, RUB, SEK, GBP, USD i CNY');
INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES(nextval('tip_racuna_seq'), 'Aktiv racun', 'AKTR', 'Aktiv tekuci racun namenjen je zaposlenima sa redovnim mesecnim primanjima');
INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES(nextval('tip_racuna_seq'), 'Klasik racun', 'KLAR', 'Klasik tekuci racun namenjen je penzionerima. Mesecna naknada iznosi 199,00 dinara.');
INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES(nextval('tip_racuna_seq'), 'Osnovni racun', 'OSNR', 'Dinarski racun bez dodatne indeksacije. Sredstva se polazu bez vremenskog ogranicenja. Mesecna naknada iznosi 200,00 dinara.');

INSERT INTO tip_racuna(id, naziv, oznaka, opis)
VALUES (-100, 'TestNaziv', 'TestOznaka', 'TestOpis');

--Racun

INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES(nextval('racun_seq'), '2498572525', 'R1', 'Racun', 3, 1);
INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES(nextval('racun_seq'), '6125125131', 'R1', 'Racun', 2, 2);
INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES(nextval('racun_seq'), '9247152175', 'R3', 'Racun', 1, 3);
INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES(nextval('racun_seq'), '8625027124', 'R4', 'Racun', 5, 2);
INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES(nextval('racun_seq'), '5829005827', 'R5', 'Racun', 4, 4);

INSERT INTO racun(id, naziv, oznaka, opis, tip_racuna, klijent)
VALUES (-100, 'TestNaziv', 'TestOznaka', 'TestOpis', 1, 1);