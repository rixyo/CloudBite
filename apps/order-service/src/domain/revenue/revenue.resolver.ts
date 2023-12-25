import { Resolver, Query, Args } from '@nestjs/graphql';
import { RevenueService } from './revenue.service';
import { RestaurantOwnerGuard } from '../auth/guards/restaurant-owner.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Revenue')
export class RevenueResolver {
  constructor(private readonly revenueService: RevenueService) {}
  @Query('revenue')
  @UseGuards(RestaurantOwnerGuard)
  async revenue(@Args('restaurantId') restaurantId: string): Promise<any> {
    const response = await this.revenueService.revenue(restaurantId);
    return { total: response.total_revenue };
  }
  @Query('currentMonthRevenue')
  @UseGuards(RestaurantOwnerGuard)
  async currentMonthRevenue(
    @Args('restaurentId') restaurantId: string,
  ): Promise<any> {
    const response = await this.revenueService.currentMonthRevenue(
      restaurantId,
    );
    return { total: response.total_revenue };
  }
  @Query('previousMonthRevenue')
  @UseGuards(RestaurantOwnerGuard)
  async previousMonthRevenue(
    @Args('restaurentId') restaurantId: string,
  ): Promise<any> {
    const response = await this.revenueService.previousMonthRevenue(
      restaurantId,
    );
    return { total: response.total_revenue };
  }
  @Query('todaysRevenue')
  @UseGuards(RestaurantOwnerGuard)
  async todaysRevenue(
    @Args('restaurentId') restaurantId: string,
  ): Promise<any> {
    const response = await this.revenueService.todaysRevenue(restaurantId);
    return { total: response.total_revenue };
  }
}
