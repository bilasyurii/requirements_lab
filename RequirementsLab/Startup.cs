using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RequirementsLab.Core.Entities;
using RequirementsLab.DAL;

namespace RequirementsLab
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<RequirementsLabContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentity<User, IdentityRole<int>>(configuration =>
            {
                configuration.Password.RequiredLength = 6;
                configuration.Password.RequireDigit = false;
                configuration.Password.RequireUppercase = false;
                configuration.Password.RequireLowercase = false;
                configuration.Password.RequireNonAlphanumeric = false;
            })
                .AddEntityFrameworkStores<RequirementsLabContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(configuration =>
            {
                configuration.Cookie.Name = "Identity.Cookie";
                configuration.LoginPath = "/Account/Login";
            });

            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, RequirementsLabContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseStatusCodePagesWithReExecute("/Error/{0}");

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });

            /*
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            */

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            Seeder.Seed(context);
        }
    }
}
