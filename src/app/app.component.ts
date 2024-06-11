import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component'; 

@Component({
    selector: 'app-root',
    standalone: true,
    // imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, TeamComponent]
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | "" = "";
  teams: string[][] = [];
  onInput(member: string){
    this.newMemberName=member;
  }
  onNumberOfTeamsInput(value: string){
    this.numberOfTeams = Number(value);
  }
  addMember(){
    if(!this.newMemberName){
      this.errorMessage= "Name can't be empty";
      return
    }
    this.errorMessage= '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  };


  generateTeams(){
    if(!this.numberOfTeams || this.numberOfTeams<=0){
      this.errorMessage="Invalid number of teams";
      return
    }
    if(this.members.length <this.numberOfTeams){
      this.errorMessage="not enough members";
    }
    this.errorMessage='';
    const allMembers = [...this.members]
    while(allMembers.length){
      for(let i=0; i <this.numberOfTeams; i++){
        const randomIndex = Math.floor(Math.random()*allMembers.length);
        const member = allMembers.splice(randomIndex,1)[0];
        if(!member) break;
        if(this.teams[i]){
          this.teams[i].push(member);
        }else{
          this.teams[i]=[member];
        }
      }
    }
    this.members=[];
    this.numberOfTeams="";
  };
}
