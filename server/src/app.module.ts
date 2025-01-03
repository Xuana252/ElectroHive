import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDbModule } from './databases/prisma-db/prisma-db.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { ProductsModule } from './modules/products/products.module';
import { ImportationsModule } from './modules/importations/importations.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartsModule } from './modules/carts/carts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ShipsModule } from './modules/ships/ships.module';
import { StaffModule } from './modules/staff/staff.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryDbService } from './databases/cloudinary-db/cloudinary-db.service';
import { CloudinaryDbModule } from './databases/cloudinary-db/cloudinary-db.module';
import { InboxModule } from './modules/inbox/inbox.module';
import { CustomerInboxModule } from './modules/customer-inbox/customer-inbox.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './common/guards/permission.guard';
import { ProfileModule } from './modules/profile/profile.module';
import { EventMessageModule } from './event-message/event-message.module';
import { MomoPaymentModule } from './modules/payment-momo/momo-payment.module';
import { ZaloPaymentModule } from './modules/payment-zalo/zalo-payment.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGOBD_URI),
    PrismaDbModule,
    AccountsModule,
    VouchersModule,
    ProductsModule,
    ImportationsModule,
    SupplierModule,
    CategoriesModule,
    CartsModule,
    CustomersModule,
    AddressesModule,
    OrdersModule,
    ShipsModule,
    StaffModule,
    RolesModule,
    CloudinaryDbModule,
    InboxModule,
    CustomerInboxModule,
    FeedbackModule,
    PermissionsModule,
    AuthModule,
    ProfileModule,
    EventMessageModule,
    MomoPaymentModule,
    ZaloPaymentModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryDbService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
