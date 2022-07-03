import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSwitchMood() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    console.log('deneme girdi1')
    if (!authForm.valid) {
      this.isLoading = false;
      console.log('deneme girdi2')
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      console.log('deneme girdi3')
      authObs = this.authService.signup(email, password);
      authForm.reset();
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/recipes']);
      this.isLoading = false;
    }, errorRes => {
      console.log(errorRes);
      this.error = errorRes;
      this.showErrorAlert(errorRes);
      this.isLoading = false;
    });
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alerCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    console.log(alertCmpFactory);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const conponentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    conponentRef.instance.message = message;
    this.closeSub = conponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    // this.closeSub.unsubscribe();
  }





  // reflectionFrontEndTarifToSells(containerId: number, type: string, sellPrice: string) {
  //   (this.containerForm.get('containers') as FormArray).controls.forEach(ct => {
  //     if (containerId === ct.value.seaContainerType.id && 'frontTransport' === type) {
  //       ct.get(['frontTransport']).get(['amount']).setValue(sellPrice.replace(/,/g, ''));
  //     }
  //     if (containerId === ct.value.seaContainerType.id && 'endTransport' === type) {
  //       ct.get(['endTransport']).get(['amount']).setValue(sellPrice.replace(/,/g, ''));
  //     }
  //   });
  //   this.frontEndTariffDetMobiles.forEach((fr, idx) => {
  //     if (fr.seaContainerType.id === containerId && fr.frontEnd === type) {
  //       this.frontEndTariffDetMobiles[idx].amount = sellPrice.replace(/,/g, '');
  //     }
  //     if (fr.seaContainerType.id === containerId && fr.frontEnd === type) {
  //       this.frontEndTariffDetMobiles[idx].amount = sellPrice.replace(/,/g, '');
  //     }
  //   });
  // }
  //
  // updateFrontEndTarifToSells(i: number, sellPrice: string) {
  //   this.createdActivity.activitySeaFullEditDTO.
  //     activityOperationDetailEditDTOs[((this.containerForm.get('containers') as FormArray).length - 1 - i)].
  //     frontAmount = sellPrice.replace(/,/g, '');
  // }
}
