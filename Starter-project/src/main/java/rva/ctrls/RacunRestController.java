package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.repository.KlijentRepository;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = {"Racun CRUD operacije"})
public class RacunRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate; 
	
	
	@Autowired 
	private RacunRepository racunRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("racun")
	@ApiOperation(value = "Vraća kolekciju svih računa iz baze podataka")
	public Collection<Racun> getBills() {
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	@ApiOperation(value = "Vraća račun iz baze podataka čiji id je prosleđen kao path varijabla")
	public Racun getBill(@PathVariable("id") Integer id) {	
		return racunRepository.getOne(id);
	}
	
	@GetMapping("racunNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju računa iz baze podataka čiji naziv je prosleđen kao path varijabla")
	public Collection<Racun> getBillsByName(@PathVariable("naziv") String name) {	
		return racunRepository.findByNazivContainingIgnoreCase(name);
	}
	
	@GetMapping("racuniKlijenta/{id}")
	@ApiOperation(value = "Vraća kolekciju računa iz baze podataka čiji klijent id je prosleđen kao path varijabla")
	public Collection<Racun> getBillsForClient(@PathVariable("id") Integer id) {	
		Klijent k = klijentRepository.getOne(id); 
		return racunRepository.findByKlijent(k);
	}
	
	@PostMapping("racun")
	@ApiOperation(value = "Upisuje račun u bazu podataka")
	public ResponseEntity<Racun> insertBill(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	@ApiOperation(value = "Modifikuje postojeći račun u bazi podataka")
	public ResponseEntity<Racun> updateBill(@RequestBody Racun racun){
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation(value = "Briše račun iz baze podataka čiji je id prosleđen kao path varijabla")
	public ResponseEntity<Racun> deleteBill(@PathVariable("id") Integer id){
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"racun\"(\"id\", \"naziv\", \"opis\", \"oznaka\", \"tip_racuna\", \"klijent\")"
					+ "VALUES (-100, 'Naziv Test', 'Opis Test', 'Oznaka Test', 1, 1)"
					);
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
}
