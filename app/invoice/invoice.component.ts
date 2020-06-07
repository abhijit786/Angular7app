import { Component, OnInit } from '@angular/core';


import { company } from '../companyName';
import { invoice } from '../invoiceInfo';
import { bill } from '../billItem';
import { profile} from '../profiles';
import { ArgumentType } from '@angular/core/src/view';

@Component({

	selector: 'app-invoice',

	templateUrl: './invoice.component.html',

  styleUrls: ['./invoice.component.css']

})




export class InvoiceComponent implements OnInit {


	allProfiles: profile[] = [
    		{text:'USD', value: 'USD'},
    		{text: 'INR', value: 'INR'},
    		{text: 'GBP', value: 'GBP'}
	];
	settings = {
        	bigBanner: false,
        	timePicker: false,
        	format: 'dd-MM-yyyy',
        	defaultOpen: false
    	};
	dated: Date = new Date;

	address: company = {
	name: 'My Company Name',
	address: '23 North St., Ahmedabad, Gujarat',
	email: 'tested@tester.com',
	contact: 1234567890,
	privileged: false
	};
	client: company = {
	name: 'Global Client',
	address: '456 North St., Ahmedabad, Gujarat 380001',
	contact: 9004567890,
	email: 'tested@client.com',
	privileged: true
	};

	invoiceInfo: invoice = {
	number: 4653,
	date: this.dated,
	dueDate: this.dated,
	currency: 'INR'
	};

	billItems: bill[] =  [
            {
                item: "Microsoft Office",
                task: "Microsoft Office suite installation",
                hours: 2,
                rate: 120
            },
            {
                item: "Oracle SQL developer",
                task: "SQL developer installation",
                hours: 1,
                rate: 140
            },
        ];



	total: number = 0;
	calculatedTotal: number=0;
	discount: number = 7;
	taxes: number = 18;
	deposit: number = 400;
	tempItem: string;
	tempTask: string;
	tempHours: number;
	tempRate: number;

showdiv: boolean= false;
selectedcurr: string;
	
	privChange(e) {
		let initialdis=this.discount;
        // add 5% discount if you have privileged
		// subtract 5% discount if you have not privileged
		if(e.target.checked || this.client.privileged){  
			this.discount=this.discount+5;
		}
		else{
			this.discount=this.discount-5;
		}
	}

	onSelect(i) {
		console.log(this.billItems);
		//delete selected item from list
		if(this.billItems!=null)
		{
		
		if(i>0)
		{
		this.billItems.splice(i,1);
		}
		else{
			this.billItems.splice(i,1);
			this.billItems.length=2;
		}
		
			
		}
		
		
		console.log(this.billItems.length);

		
	}

	getSubTotal() : number {
		

		if(this.billItems==null || this.billItems.length==0)
		{
			this.calculatedTotal=0;
			this.total=0;

			return 0;
		}
		// Calculate rounded Subtotal
		let subtotal =0;

		this.billItems.forEach(element => {
		let hours=element.hours==undefined?0:element.hours;
		let rate=element.rate==undefined?0:element.rate;

		subtotal=subtotal+(hours*rate);
		});
		this.total=subtotal;
		return Math.round(subtotal);	
    }

	getTotal(): number {
		// Calculate rounded Total
		if(this.billItems==null || this.billItems.length==0)
		{
			this.total=0;
			return 0;
		}
		this.calculatedTotal=(this.total)-((this.discount/100)*this.total)+((this.taxes/100)*this.total)-this.deposit;
        return Math.round(this.calculatedTotal); 
	}

    mouseEnterAddItem(){
        // display addItem division
        this.showdiv=true;
        console.log(this.showdiv);

    }

    mouseLeaveAddItem(){
        // don't display addItem division
        this.showdiv=false;
        console.log(this.showdiv);

    }


	addItem() {
		// add an item into billItems array
		let hrs=0;
		let rate=0;

		if(this.tempHours==undefined)
		{
			 hrs =0;
		}
		else
		{
			 hrs = this.tempHours;
		}

		if(this.tempRate==undefined)
		{
			 rate =0;
		}
		else
		{
			 rate = this.tempRate;
		}
		
		let obj={
			item: this.tempItem,
			task: this.tempTask,
			hours: hrs,
			rate: rate
		}
		console.log(obj);
		this.billItems.push(obj);
  	}




	constructor() { }

	ngOnInit() {
		this.selectedcurr=this.allProfiles[1].value;
		if(this.billItems==null || this.billItems.length==0)
		{
			this.total=0;
			return 0;
		}

		}

	}
