class ApplicationController < ActionController::Base
  before_action :track_visits
  before_action :set_greeting

  private

  def track_visits
    session[:last_visited] = Time.current
    session[:visit_count] = (session[:visit_count] || 0) + 1
    @visit_count = session[:visit_count]
    session[:page_visits] ||= {}
    session[:page_visits][request.path] = (session[:page_visits][request.path] || 0) + 1
    @page_visits = session[:page_visits][request.path]
  end

  def set_greeting
    current_hour = Time.current.hour
    @greeting = case current_hour
                when 5..11 then "Good Morning"
                when 12..16 then "Good Afternoon"
                when 17..20 then "Good Evening"
                else "Good Night"
                end
  end
  # For this part to actually work we would either need a user model or client side tracking but it is out of scope based on the requirements given lol
end
