package com.example.electrohive.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.electrohive.Models.District;
import com.example.electrohive.Models.Province;
import com.example.electrohive.Models.Ward;
import com.example.electrohive.R;
import com.example.electrohive.ViewModel.LocationViewModel;


import java.util.ArrayList;
import java.util.List;

public class ProvincePage extends AppCompatActivity {

    private ProgressBar loadingSpinner;

    private ListView provinceListView;
    private LocationViewModel viewModel;

    private ArrayAdapter<String> adapter;
    private List<Province> provinces = new ArrayList<>();

    private ImageButton backButton;
    private final ActivityResultLauncher<Intent> resultLauncher = registerForActivityResult (
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                    if (result.getResultCode() == RESULT_OK) {
                        Intent data =result.getData();
                        if (data != null) {
                            Ward resultWard = (Ward) data.getSerializableExtra("WARD");
                            District resultDistrict = (District) data.getSerializableExtra("DISTRICT");
                            Province resultProvince = (Province) data.getSerializableExtra("PROVINCE");


                            Intent resultIntent = new Intent();
                            resultIntent.putExtra("WARD", resultWard);
                            resultIntent.putExtra("DISTRICT",resultDistrict);
                            resultIntent.putExtra("PROVINCE",resultProvince);
                            setResult(RESULT_OK, resultIntent);
                            finish();
                        }

                    }
            });
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.province_page);

        provinceListView = findViewById(R.id.province_listview);
        loadingSpinner = findViewById(R.id.loading_spinner);

        viewModel = new ViewModelProvider(this).get(LocationViewModel.class);

        backButton = findViewById(R.id.backbutton);
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        // Initialize the list to hold provinces
        provinces = new ArrayList<>();

        loadingSpinner.setVisibility(View.VISIBLE); // Hide spinner once data loads



        // Set up Retrofit
        viewModel.getProvinces().observe(this, new Observer<List<Province>>() {
            @Override
            public void onChanged(List<Province> updatedProvinces) {

                provinces = updatedProvinces;

                // Update UI
                List<String> provinceNames = new ArrayList<>();
                for (Province province : provinces) {
                    provinceNames.add(province.getProvinceName());
                }

                // Create adapter if null, otherwise update data
                if (adapter == null) {
                    adapter = new ArrayAdapter<>(ProvincePage.this, android.R.layout.simple_list_item_1, provinceNames);
                    provinceListView.setAdapter(adapter);
                } else {
                    adapter.clear();
                    adapter.addAll(provinceNames);
                    adapter.notifyDataSetChanged();
                }
                loadingSpinner.setVisibility(View.GONE);
            }
        });

        // Handle ListView clicks
        provinceListView.setOnItemClickListener((parent, view, position, id) -> {
            Province clickedProvince = provinces.get(position);
            Intent intent = new Intent(ProvincePage.this, DistrictPage.class);
            intent.putExtra("PROVINCE", clickedProvince);
            resultLauncher.launch(intent);
        });
    }

}
