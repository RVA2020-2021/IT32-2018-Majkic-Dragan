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
import rva.jpa.TipRacuna;
import rva.repository.TipRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Tip Racuna - CRUD operacije"})
public class TipRacunaRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private TipRacunaRepository tipRacunaRepository;
	
	@GetMapping("tipRacuna")
	@ApiOperation(value = "Vraća kolekciju svih tipova računa iz baze podataka")
	public Collection<TipRacuna> getBillTypes() {
		return tipRacunaRepository.findAll();
	}
	
	@GetMapping("tipRacuna/{id}")
	@ApiOperation(value = "Vraća tip računa iz baze podataka čiji id je prosleđen kao path varijabla")
	public TipRacuna getBillType(@PathVariable("id") Integer id) {	
		return tipRacunaRepository.getOne(id);
	}
	
	@GetMapping("tipRacunaNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju tipova računa iz baze podataka čiji naziv je prosleđen kao path varijabla")
	public Collection<TipRacuna> getBillTypesByName(@PathVariable("naziv") String name) {	
		return tipRacunaRepository.findByNazivContainingIgnoreCase(name);
	}
	
	@PostMapping("tipRacuna")
	@ApiOperation(value = "Upisuje tip računa u bazu podataka")
	public ResponseEntity<TipRacuna> insertBillType(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("tipRacuna")
	@ApiOperation(value = "Modifikuje postojeći tip računa u bazi podataka")
	public ResponseEntity<TipRacuna> updateBillType(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		}
		tipRacunaRepository.save(tipRacuna);
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}

	@Transactional
	@DeleteMapping("tipRacuna/{id}")
	@ApiOperation(value = "Briše tip računa iz baze podataka čiji je id prosleđen kao path varijabla")
	public ResponseEntity<TipRacuna> deleteBillType(@PathVariable("id") Integer id){
		if(!tipRacunaRepository.existsById(id)) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from racun where tip_racuna = " +id);
		tipRacunaRepository.deleteById(id);
		tipRacunaRepository.flush();//dodato zbog transakcije, jer lazni insert pravi problem ukoliko ne stoji ovo ili ukoliko nije zakomentarisana 74 linija
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"tip_racuna\"(\"id\", \"naziv\", \"opis\", \"oznaka\")"
					+ "VALUES (-100, 'Naziv Test', 'Opis Test', 'Oznaka Test')"
					);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
}
