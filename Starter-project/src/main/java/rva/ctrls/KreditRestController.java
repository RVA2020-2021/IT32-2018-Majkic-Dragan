package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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
import rva.jpa.Kredit;
import rva.repository.KreditRepository;

@CrossOrigin
@RestController
@Api(tags = {"Kredit CRUD operacije"})
public class KreditRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private KreditRepository kreditRepository;
	
	@GetMapping("kredit")
	@ApiOperation(value = "Vraća kolekciju svih kredita iz baze podataka")
	public Collection<Kredit> getCredits() {
		return kreditRepository.findAll();
	}
	
	@GetMapping("kredit/{id}")
	@ApiOperation(value = "Vraća kredit iz baze podataka čiji id je prosleđen kao path varijabla")
	public Kredit getCredit(@PathVariable("id") Integer id) {	
		return kreditRepository.getOne(id);
	}
	
	@GetMapping("kreditNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju kredita iz baze podataka čiji naziv je prosleđen kao path varijabla")
	public Collection<Kredit> getCreditsByName(@PathVariable("naziv") String name) {	
		return kreditRepository.findByNazivContainingIgnoreCase(name);
	}
	
	@PostMapping("kredit")
	@ApiOperation(value = "Upisuje kredit u bazu podataka")
	public ResponseEntity<Kredit> insertCredit(@RequestBody Kredit kredit){
		if(!kreditRepository.existsById(kredit.getId())) {
			kreditRepository.save(kredit);
			return new ResponseEntity<Kredit>(HttpStatus.OK);
		}
		return new ResponseEntity<Kredit>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("kredit")
	@ApiOperation(value = "Modifikuje postojeći kredit u bazi podataka")
	public ResponseEntity<Kredit> updateCredit(@RequestBody Kredit kredit){
		if(!kreditRepository.existsById(kredit.getId())) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		kreditRepository.save(kredit);
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("kredit/{id}")
	@ApiOperation(value = "Briše kredit iz baze podataka čiji je id prosleđen kao path varijabla")
	public ResponseEntity<Kredit> deleteCredit(@PathVariable("id") Integer id){
		if(!kreditRepository.existsById(id)) {
			return new ResponseEntity<Kredit>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from racun where klijent in (select id from klijent where kredit = " +id+")");
		jdbcTemplate.execute("delete from klijent where kredit = " +id);
		kreditRepository.deleteById(id);
		kreditRepository.flush();//dodato zbog transakcije, jer lazni insert pravi problem ukoliko ne stoji ovo ili ukoliko nije zakomentarisana 74 linija
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"kredit\"(\"id\", \"naziv\", \"opis\", \"oznaka\")"
					+ "VALUES ('-100', 'Naziv Test', 'Opis Test', 'Oznaka Test')"
					);
		}
		return new ResponseEntity<Kredit>(HttpStatus.OK);
	}
}
