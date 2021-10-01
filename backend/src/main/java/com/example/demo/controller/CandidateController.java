package com.example.demo.controller;

import com.example.demo.model.Candidate;
import com.example.demo.repository.CandidateRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidates")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class CandidateController {

    private final CandidateRepository candidateRepository;

    public CandidateController(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    @GetMapping
    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }

    @GetMapping("/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidateRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/search/{queryString}")
    public List<Candidate> getCandidateByName(@PathVariable String queryString) {
        List<String> keys = Arrays.asList(queryString.trim().replaceAll("\\s+"," ").split( " "));
        System.out.println(keys);
        List<Candidate> candidates = candidateRepository.findAll();

        return candidates.stream().filter(el ->
                keys.stream().allMatch(key ->
                        (el.getFirstName().toLowerCase() + " " + el.getLastName().toLowerCase()).contains(key.toLowerCase())))
                .collect(Collectors.toList());

    }

    @GetMapping("/searchRange/{min}/{max}")
    public List<Candidate> getRange(@PathVariable int min, @PathVariable int max) {
        return candidateRepository.findAll().stream().filter(el -> {
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(el.getBirthDate());
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1;
            int day = calendar.get(Calendar.DAY_OF_MONTH);
            int age = getAge(year,month,day);
            return age > min && age < max;
        }).collect(Collectors.toList());
    }

    private List<String> parseNumbers(JSONArray numbersJsonArray) throws JSONException {
        ArrayList<String> numbers = new ArrayList<>();

        if (numbersJsonArray != null) {
            for (int i=0;i<numbersJsonArray.length();i++){
                numbers.add((String) numbersJsonArray.get(i));
            }
        }
        return numbers;
    }

    @PostMapping
    public ResponseEntity createCandidate(@RequestParam("candidate") String candidate,@RequestParam("file") MultipartFile file) throws URISyntaxException, JSONException, ParseException {
        String fileName= StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        JSONObject obj = new JSONObject(candidate);

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = df.parse(obj.getString("birthDate"));

        List<String> numbers = parseNumbers(obj.getJSONArray("phoneNumbers"));

        Candidate candidate1 =  new Candidate(obj.getString("firstName"),obj.getString("lastName"),obj.getString("address"),date, numbers,"");

        if(fileName.contains("..")){
            throw new MultipartException("file not valid");
        }
        try{
            candidate1.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }
        Candidate savedClient = candidateRepository.save(candidate1);
        return ResponseEntity.created(new URI("/candidates/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestParam("candidate") String candidate,@RequestParam("file") MultipartFile file) throws JSONException, ParseException {
        Candidate currentCandidate = candidateRepository.findById(id).orElseThrow(RuntimeException::new);

        String fileName= StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        JSONObject obj = new JSONObject(candidate);

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = df.parse(obj.getString("birthDate"));

        List<String> numbers = parseNumbers(obj.getJSONArray("phoneNumbers"));

        if(fileName.contains("..")){
            throw new MultipartException("file not valid");
        }
        try{
            currentCandidate.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }

        currentCandidate.setFirstName(obj.getString("firstName"));
        currentCandidate.setLastName(obj.getString("lastName"));
        currentCandidate.setBirthDate(date);
        currentCandidate.setPhoneNumbers(numbers);
        currentCandidate.setAddress(obj.getString("address"));
        candidateRepository.save(currentCandidate);
        return ResponseEntity.ok(currentCandidate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        candidateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public int getAge(int year, int month, int dayOfMonth) {
        return Period.between(
                LocalDate.of(year, month, dayOfMonth),
                LocalDate.now()
        ).getYears();
    }



}