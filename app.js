class Student{
   static count=0;
   constructor(name , age , phone_number, board_marks){
      this.n=name;
      this.a=age;
      this.p=phone_number;
      this.b=board_marks;
      Student.countNumber();
   }
   static countNumber(){
      return Student.count++;
   }
   eligibleForPlacements(minAge){
   return (minMarks)=>{
      if(this.b>minMarks && this.a>minAge){
         console.log(this.n+' is eligible for placements');
      }
      else{
         console.log(this.n+' is not eligible for placements');
      }
   }
}
}
const Student1=new Student('jon',20,2435,30);
const Student2=new Student('sam',19,3243,45);
const Student3=new Student('kat',22,6786,56);
const Student4=new Student('jim',21,12343,78);
const Student5=new Student('jill',20,3454,23);
Student1.eligibleForPlacements(20)(40);
Student2.eligibleForPlacements(20)(40);
Student3.eligibleForPlacements(20)(40);
Student4.eligibleForPlacements(20)(40);
Student5.eligibleForPlacements(20)(40);