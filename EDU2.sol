// SPDX-License-Identifier: Unliscense

pragma solidity ^0.8.7;


contract Edu{
    struct Course{
        string name;
        uint course_id;
        string instructor_name;
        uint week_duration;
        uint total_seats;
        uint remaining_seats;
        uint price;
    }
    struct Student{
        string name;
        string email;
        uint[] course_enroll;
        bool isRegister;
    }

    address owner;
    constructor(){
        owner = msg.sender;
    }
    string[]  temp;
    uint[] temp2;
    mapping(uint=> Course) public course;
    mapping(address=> Student) public students;
    // Course[] course;
    uint nextId = 0;
    uint nextStudent = 0;

    function createCourse(string memory name, string memory instructor_name, uint week_duration,uint total_seats,uint price) public {
        require(owner == msg.sender, "Only owner of the contract can add courses" );
        course[nextId] = Course(name,nextId,instructor_name,week_duration,total_seats,total_seats,price);
        nextId++;
    }
    function registerStudent(string memory name, string memory email) public {
        require(!students[msg.sender].isRegister, "You are already registered ");
        uint[] memory empty; 
        students[msg.sender] = Student(name, email,empty, true);
    }
   
   function enrol(uint id )public payable {
       require(msg.value >= course[id].price*1 ether, "Not enough ether" );
       require(course[id].remaining_seats > 0 ,"No seats are available");
       require(students[msg.sender].isRegister,"You need to register first");
       students[msg.sender].course_enroll.push(id);
       course[id].remaining_seats-=1;
    
    }
   function list_of_courses_a_student_enrolled()public view returns (uint[] memory){
       
       return students[msg.sender].course_enroll;
   }

   function list_of_course_name() public returns (string[] memory) {
       
       for(uint i = 0 ; i<nextId;i++){
           temp.push(course[i].name);
       }

       return temp;
   }
   function list_of_course_id() public returns (uint[] memory){
       for(uint i = 0 ; i<nextId;i++){
           temp2.push(course[i].course_id);
       }

       return temp2;
   }
   function getCurrentStudent() public view returns (string memory){

       return students[msg.sender].name;
   }

   function getPriceOfCourse(uint id) public view returns (uint ){
       return course[id].price;
   }
   function courseCount(uint courseid) public view returns(uint) {
        return (course[courseid].total_seats - course[courseid].remaining_seats);
   }
}
