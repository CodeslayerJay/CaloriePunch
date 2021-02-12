using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CaloriePunch.Infrastructure.EF;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CaloriePunch.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //var applicationAssembly = AppDomain.CurrentDomain.Load("CaloriePunch.Service");
            //services.AddAutoMapper(applicationAssembly);

            // Contexts
            services.AddDbContext<AppDbContext>(opts =>
                opts.UseSqlServer(Configuration.GetConnectionString("DEV")));

            //services.AddDbContext<IdentityDataContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("Identity")));

            //services.AddIdentity<AppUser, IdentityRole>()
            //    .AddEntityFrameworkStores<IdentityDataContext>()
            //    .AddDefaultTokenProviders();

            services.AddCors();

            services.AddControllers().AddNewtonsoftJson();
            services.AddAuthorization();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseCors("AllowedOrigins");
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void AddAppCorsPolicies(IServiceCollection services)
        {
            var origins = Configuration.GetSection("AllowedOrigins").Value.Split(';');
            services.AddCors(options =>
            {

                options.AddPolicy(name: "AllowedOrigins",
                                  builder =>
                                  {
                                      builder.WithOrigins(origins);
                                      //builder.AllowAnyOrigin();
                                      builder.AllowAnyHeader();
                                      builder.AllowAnyMethod();

                                  });
            });


        }

        /// <summary>
        /// Sets up the application's jwt bearer tokens and applies policies to the service collection
        /// </summary>
        /// <param name="services"></param>
        //private void AddAuthScheme(IServiceCollection services)
        //{

        //    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("TokenSettings:SecurityKey").Value));
        //    services.AddAuthentication(opts =>
        //    {
        //        opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        //        opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //        opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        //    }).AddJwtBearer(cfg =>
        //    {
        //        cfg.RequireHttpsMetadata = false;
        //        cfg.SaveToken = true;
        //        cfg.TokenValidationParameters = new TokenValidationParameters()
        //        {
        //            ValidIssuer = Configuration.GetSection("TokenSettings:ValidIssuer").Value,
        //            ValidAudience = Configuration.GetSection("TokenSettings:ValidAudience").Value,
        //            IssuerSigningKey = signingKey,
        //            ClockSkew = TimeSpan.Zero,

        //            // security switches
        //            RequireExpirationTime = true,
        //            ValidateIssuer = true,
        //            ValidateIssuerSigningKey = true,
        //            ValidateAudience = true
        //        };
        //    });
        //}
    }
}
