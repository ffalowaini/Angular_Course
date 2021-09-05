import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  authObs = new Observable<AuthResponseData>();
  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const pass = form.value.password;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, pass);
    } else {
      this.authObs = this.authService.signup(email, pass);
    }

    this.authObs.subscribe(
      resData => {
        // console.log(resData);
        this.router.navigate(['/recipes']);

      }, error => {
        this.showError(error);
        this.error = error; // error.message;
        // console.log(error);
      });
    form.reset();

  }

  onHandel() {
    this.error = null;
  }

  private showError(error: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const compRef = hostViewContainerRef.createComponent(alertCmpFactory);

    compRef.instance.message = error;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe;
      hostViewContainerRef.clear();
    });

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }


}
